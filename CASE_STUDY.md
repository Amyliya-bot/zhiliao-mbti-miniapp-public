# Case Study: AI Conversational MBTI Mini Program

## Background

Traditional MBTI tests often rely on long questionnaires. This project explores a more natural product form: users talk with an AI across everyday scenarios, and the system infers personality tendencies from the conversation.

The goal was not only to build a test page, but to design a complete mini program experience: onboarding, scenario dialogue, AI analysis, result report, history, privacy policy, and share card generation.

## My Role

- Product concept and interaction flow design.
- Scenario script design for MBTI dimensions.
- WeChat Mini Program front-end implementation.
- AI cloud function integration.
- Result report structure and share card experience.
- Security and compliance refinements for public showcase.

## Product Flow

1. User enters the guide or test hall.
2. The system selects several conversation scenarios across personality dimensions.
3. The user chats with the AI in a familiar, WeChat-like interface.
4. Cloud functions call the AI model and apply guardrails, rate limits, and content checks.
5. The final transcript is analyzed into MBTI type and dimension scores.
6. The mini program shows a report and supports share image generation.

## AI Design

The project uses two cloud functions:

- `chatAI`: Generates scenario-based conversation replies and handles injection-like inputs.
- `analyzeMBTI`: Converts the conversation transcript into a structured MBTI analysis result.

The model key is never exposed on the client. The public repository replaces real environment IDs and API keys with placeholders.

## Engineering Highlights

- Native WeChat Mini Program pages and custom styles.
- Tencent CloudBase cloud functions.
- Server-side AI calls through environment variables.
- Daily usage limit and simple rate limiting.
- Content safety checks through WeChat cloud APIs.
- Prompt-injection pattern detection for public-facing chat.
- Canvas-based result share card generation.

## Design Highlights

- Conversation-based assessment rather than a static questionnaire.
- Scene scripts use familiar situations such as camping, travel, work, weekend plans, and social energy.
- Result pages combine personality type, dimension bars, impressions, and growth suggestions.
- Share cards are designed for social distribution, making the product more suitable for growth experiments.

## Competition Relevance

For the 2026 AI Future Talent competition, this project shows that the team can:

- Turn AI capability into a real user-facing product prototype.
- Design user journeys, scripts, reports, and sharing mechanisms.
- Combine visual/product thinking with implementable code.
- Use AI coding tools to build and iterate practical software.
- Handle public showcase safety, including key isolation and config sanitization.

This is especially relevant for AI marketing, AI content factory, brand agent, and social growth topics.

## Public Safety Notes

This showcase intentionally excludes:

- Real WeChat appid.
- Real CloudBase environment ID.
- API keys.
- Private developer config files.
- Local logs, cookies, cache, and user data.

See `SECURITY.md` for the detailed sanitization notes.
