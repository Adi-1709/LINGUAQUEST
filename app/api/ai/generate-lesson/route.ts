import { NextRequest, NextResponse } from 'next/server'
import { generateAILesson, type AIConfig, type LessonRequest } from '@/lib/ai-agent'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { lessonRequest } = body

		// Get API key from environment variable
		const apiKey = process.env.QUBRID_API_KEY

		if (!apiKey) {
			return NextResponse.json(
				{ error: 'Qubrid API key is not configured. Please set QUBRID_API_KEY in your environment variables.' },
				{ status: 500 }
			)
		}

		// Validate lesson request
		if (!lessonRequest || !lessonRequest.language || !lessonRequest.level) {
			return NextResponse.json(
				{ error: 'Language and level are required' },
				{ status: 400 }
			)
		}

		// Auto-configure Qubrid AI (via Custom Provider)
		const config: AIConfig = {
			provider: 'custom',
			apiKey: apiKey,
			baseURL: 'https://platform.qubrid.com/api/v1/qubridai',
			model: 'openai/gpt-oss-120b',
		}

		// Generate lesson
		const generatedLesson = await generateAILesson(config, lessonRequest as LessonRequest)

		return NextResponse.json({ success: true, lesson: generatedLesson })
	} catch (error: any) {
		console.error('AI lesson generation error:', error)
		return NextResponse.json(
			{ error: error.message || 'Failed to generate lesson' },
			{ status: 500 }
		)
	}
}
