import { NextResponse } from "next/server"

const translate = require("@iamtraction/google-translate")

export async function POST(request: Request) {
  function getLanguageCode(languageName: string) {
    switch (languageName.toLowerCase()) {
      case "tamil":
        return "ta"
      case "hindi":
        return "hi"
      case "bengali":
        return "bn"
      case "gujarathi":
        return "gu"
      case "telugu":
        return "te"
      default:
        return "te" // Default language code, change as needed
    }
  }

  try {
    const { body, lang } = await request.json()

    const lngcode = getLanguageCode(lang)

    // Perform translation
    const translationResult = await translate(body, { to: lngcode })
    const translatedText = translationResult.text

    // Return translated text as JSON response
    return new NextResponse(JSON.stringify({ translatedText }), {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.error(err)
    return new NextResponse("Internal error", { status: 500 })
  }
}
