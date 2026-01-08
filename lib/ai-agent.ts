/**
 * AI Agent Service
 * Supports multiple AI providers (OpenAI, Anthropic, etc.)
 */

export type AIProvider = 'openai' | 'anthropic' | 'google' | 'custom'

export type AIConfig = {
	provider: AIProvider
	apiKey: string
	baseURL?: string // For custom providers
	model?: string // Model name (e.g., 'gpt-4', 'claude-3-opus')
}

export type LessonRequest = {
	language: string
	level: 'Beginner' | 'Intermediate' | 'Advanced'
	topics?: string[]
	userGoals?: string
	recentMissedTopics?: string[]
	preferredPace?: 'slow' | 'medium' | 'fast'
}

export type GeneratedLesson = {
	title: string
	description: string
	topics: string[]
	vocabulary: Array<{
		english: string
		translation: string
		category: string
	}>
	exercises: Array<{
		question: string
		questionType: 'english' | 'translation'
		options: string[]
		correctAnswer: number
		correctTranslation: string
	}>
}

/**
 * Generate a lesson using OpenAI API
 */
async function generateWithOpenAI(
	config: AIConfig,
	request: LessonRequest
): Promise<GeneratedLesson> {
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${config.apiKey}`,
		},
		body: JSON.stringify({
			model: config.model || 'gpt-4',
			messages: [
				{
					role: 'system',
					content: `You are an expert language learning tutor. Generate personalized lessons in JSON format.`,
				},
				{
					role: 'user',
					content: buildPrompt(request),
				},
			],
			temperature: 0.7,
			response_format: { type: 'json_object' },
		}),
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`)
	}

	const data = await response.json()
	const content = JSON.parse(data.choices[0].message.content)
	return parseAILesson(content)
}

/**
 * Generate a lesson using Anthropic API
 */
async function generateWithAnthropic(
	config: AIConfig,
	request: LessonRequest
): Promise<GeneratedLesson> {
	const response = await fetch('https://api.anthropic.com/v1/messages', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': config.apiKey,
			'anthropic-version': '2023-06-01',
		},
		body: JSON.stringify({
			model: config.model || 'claude-3-opus-20240229',
			max_tokens: 4000,
			messages: [
				{
					role: 'user',
					content: buildPrompt(request),
				},
			],
		}),
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(`Anthropic API error: ${error.error?.message || 'Unknown error'}`)
	}

	const data = await response.json()
	const content = JSON.parse(data.content[0].text)
	return parseAILesson(content)
}

/**
 * Generate a lesson using Google Gemini API
 */
import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Generate a lesson using Google Gemini API
 */
async function generateWithGoogle(
	config: AIConfig,
	request: LessonRequest
): Promise<GeneratedLesson> {
	const genAI = new GoogleGenerativeAI(config.apiKey)
	const model = genAI.getGenerativeModel({ model: config.model || 'gemini-1.5-flash-latest' })

	const prompt = `You are an expert language learning tutor. Generate personalized lessons in JSON format.\n\n${buildPrompt(request)}\n\nIMPORTANT: Return ONLY valid JSON, no markdown, no code blocks, just the raw JSON object.`

	const result = await model.generateContent(prompt)
	const response = await result.response
	const text = response.text()

	// Parse JSON response
	let content
	try {
		content = JSON.parse(text)
	} catch (parseError) {
		// Try to extract JSON if wrapped in markdown
		const jsonMatch = text.match(/\{[\s\S]*\}/)
		if (jsonMatch) {
			content = JSON.parse(jsonMatch[0])
		} else {
			throw new Error('Failed to parse JSON from Gemini response')
		}
	}

	return parseAILesson(content)
}

/**
 * Generate a lesson using a custom API endpoint
 */
async function generateWithCustom(
	config: AIConfig,
	request: LessonRequest
): Promise<GeneratedLesson> {
	if (!config.baseURL) {
		throw new Error('baseURL is required for custom provider')
	}

	const response = await fetch(`${config.baseURL}/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${config.apiKey}`,
		},
		body: JSON.stringify({
			model: config.model || 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content: `You are an expert language learning tutor. Generate personalized lessons in JSON format.`,
				},
				{
					role: 'user',
					content: buildPrompt(request),
				},
			],
			temperature: 0.7,
			response_format: { type: 'json_object' },
			stream: false,
		}),
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(`Custom API error: ${error.error?.message || 'Unknown error'}`)
	}

	const data = await response.json()
	const content = JSON.parse(data.choices[0].message.content)
	return parseAILesson(content)
}

/**
 * Build the prompt for AI generation
 */
function buildPrompt(request: LessonRequest): string {
	return `Generate a personalized ${request.level} level lesson for learning ${request.language}.

Requirements:
- Create a lesson with title, description, and 3-5 topics
- Generate 10-15 vocabulary items with English and ${request.language} translations, grouped by categories
- Create 5-8 quiz exercises (mix of English->${request.language} and ${request.language}->English)
- Make it engaging and practical

${request.topics && request.topics.length > 0 ? `Focus on these topics: ${request.topics.join(', ')}` : ''}
${request.userGoals ? `User goals: ${request.userGoals}` : ''}
${request.recentMissedTopics && request.recentMissedTopics.length > 0 ? `Recent missed topics to review: ${request.recentMissedTopics.join(', ')}` : ''}
${request.preferredPace ? `Preferred pace: ${request.preferredPace}` : ''}

Return ONLY valid JSON in this exact format:
{
  "title": "Lesson title in ${request.language}",
  "description": "Brief description of what will be learned",
  "topics": ["topic1", "topic2", "topic3"],
  "vocabulary": [
    {
      "english": "Hello",
      "translation": "Translation in ${request.language}",
      "category": "Greetings"
    }
  ],
  "exercises": [
    {
      "question": "Hello",
      "questionType": "english",
      "options": ["Option1", "Option2", "Option3", "Option4"],
      "correctAnswer": 0,
      "correctTranslation": "Correct translation"
    }
  ]
}`
}

/**
 * Parse AI response into GeneratedLesson format
 */
function parseAILesson(content: any): GeneratedLesson {
	return {
		title: content.title || 'AI Generated Lesson',
		description: content.description || 'A personalized lesson generated for you.',
		topics: content.topics || [],
		vocabulary: content.vocabulary || [],
		exercises: content.exercises || [],
	}
}

/**
 * Main AI Agent function
 */
export async function generateAILesson(
	config: AIConfig,
	request: LessonRequest
): Promise<GeneratedLesson> {
	try {
		switch (config.provider) {
			case 'openai':
				return await generateWithOpenAI(config, request)
			case 'anthropic':
				return await generateWithAnthropic(config, request)
			case 'google':
				return await generateWithGoogle(config, request)
			case 'custom':
				return await generateWithCustom(config, request)
			default:
				throw new Error(`Unsupported provider: ${config.provider}`)
		}
	} catch (error) {
		console.error('AI generation error:', error)
		throw error
	}
}

/**
 * Validate AI configuration
 */
export function validateAIConfig(config: AIConfig): { valid: boolean; error?: string } {
	if (!config.apiKey || config.apiKey.trim() === '') {
		return { valid: false, error: 'API key is required' }
	}

	if (config.provider === 'custom' && !config.baseURL) {
		return { valid: false, error: 'baseURL is required for custom provider' }
	}

	return { valid: true }
}

