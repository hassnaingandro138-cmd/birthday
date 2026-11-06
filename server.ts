import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

// High body limit for base64 photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health Check API
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// Image to Video Generation Endpoint using Gemini Omni Flash (Interactions API)
app.post('/api/animate-video', async (req, res) => {
  try {
    const { image, mimeType, prompt, aspectRatio } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image is required for video animation.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error:
          'GEMINI_API_KEY is not configured on the server. Please ensure an API key with access to gemini-omni-1.1-flash is available.',
      });
    }

    // Clean data URL to raw base64 and extract mimeType
    let base64Data = image;
    let actualMime = mimeType || 'image/jpeg';

    if (typeof image === 'string' && image.startsWith('data:')) {
      const match = image.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        actualMime = match[1];
        base64Data = match[2];
      }
    }

    // Validate aspect ratio (16:9 landscape or 9:16 portrait)
    const validAspectRatio: '16:9' | '9:16' =
      aspectRatio === '9:16' ? '9:16' : '16:9';

    const motionPrompt =
      prompt && prompt.trim().length > 0
        ? prompt.trim()
        : 'Bring this memorable photo to life with smooth, lifelike cinematic motion, gentle camera drifting, warm celebratory lighting, and elegant atmospheric particles.';

    const ai = new GoogleGenAI({ apiKey });

    // Call Gemini Omni 1.1 Flash via Interactions API
    const interaction = await ai.interactions.create(
      {
        model: 'gemini-omni-1.1-flash',
        input: [
          {
            type: 'image',
            mime_type: actualMime,
            data: base64Data,
          },
          {
            type: 'text',
            text: motionPrompt,
          },
        ],
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: 'video',
          aspect_ratio: validAspectRatio,
        },
      },
      { timeout: 300000 }
    );

    // Extract output video from helper or steps
    let videoDataUrl: string | null = null;
    let videoUri: string | null = null;
    let outputMimeType = 'video/mp4';

    const videoPart = interaction.output_video;
    if (videoPart) {
      outputMimeType = videoPart.mime_type || 'video/mp4';
      if (videoPart.data) {
        videoDataUrl = `data:${outputMimeType};base64,${videoPart.data}`;
      }
      if (videoPart.uri) {
        videoUri = videoPart.uri;
      }
    }

    // Fallback: check interaction.steps
    if (!videoDataUrl && !videoUri && interaction.steps) {
      for (const step of interaction.steps) {
        if (step.type === 'model_output' && step.content) {
          const v: any = (step.content as any[]).find((c: any) => c.type === 'video');
          if (v) {
            outputMimeType = v.mime_type || 'video/mp4';
            if (v.data) {
              videoDataUrl = `data:${outputMimeType};base64,${v.data}`;
            }
            if (v.uri) {
              videoUri = v.uri;
            }
            break;
          }
        }
      }
    }

    if (!videoDataUrl && !videoUri) {
      return res.status(500).json({
        error: 'The model completed the request but no video stream was returned. Please try with another photo or prompt.',
      });
    }

    return res.json({
      success: true,
      video: videoDataUrl,
      uri: videoUri,
      mimeType: outputMimeType,
      aspectRatio: validAspectRatio,
    });
  } catch (error: any) {
    console.error('Video animation generation error:', error);
    const errorMessage =
      error?.message || 'Failed to generate video with Gemini Omni Flash.';
    return res.status(500).json({ error: errorMessage });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
