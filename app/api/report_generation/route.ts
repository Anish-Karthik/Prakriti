import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"
import getSession from "@/actions/getSession"
//import fontkit from "@pdf-lib/fontkit"
//import { PDFDocument, rgb } from "pdf-lib"

import prisma from "@/lib/prismadb"

export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session?.user?.email) {
      return NextResponse.json("UnAuthorised")
    }
    const { messages } = await req.json()
    console.log(messages);
    // const pdfDoc = await PDFDocument.create()
    // pdfDoc.registerFontkit(fontkit)

    // const page = pdfDoc.addPage([600, 400])
    // const dir = path.resolve("./public", "images/certificate1.jpg")
    // const jpgImageBytes = fs.readFileSync(dir)
    // const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)

    // const { width, height } = page.getSize()
    // const { x, y } = { x: 0, y: 0 }
    // const imageWidth = width
    // const imageHeight = height

    // page.drawImage(jpgImage, {
    //   x,
    //   y,
    //   width: imageWidth,
    //   height: imageHeight,
    // })

    // const fontSize = 40
    // const fontPath = path.resolve("./public", "fonts/Rochester-Regular.ttf")
    // const fontBytes = fs.readFileSync(fontPath)
    // const customFont = await pdfDoc.embedFont(fontBytes)
    // const textWidth = customFont.widthOfTextAtSize(name, fontSize)

    // const textX = (width - textWidth) / 2
    // const textY = height - fontSize

    // page.drawText(name, {
    //   x: textX,
    //   y: textY - 150,
    //   size: fontSize,
    //   font: customFont,
    //   color: rgb(1, 1, 1),
    // })
    // const sfontPath = path.resolve("./public", "fonts/Roboto-Bold.ttf")
    // const sfontBytes = fs.readFileSync(sfontPath)
    // const scustomFont = await pdfDoc.embedFont(sfontBytes)

    // page.drawText(duration + " hours", {
    //   x: textX + 110,
    //   y: 120,
    //   size: 11,
    //   font: scustomFont,
    //   color: rgb(1, 1, 1),
    // })

    // const courseWidth = scustomFont.widthOfTextAtSize(course_name, 17)
    // const courseX = (width - courseWidth) / 2
    // const courseY = height - fontSize
    // page.drawText(course_name, {
    //   x: courseX,
    //   y: courseY - 215,
    //   size: 17,
    //   font: scustomFont,
    //   color: rgb(1, 1, 1),
    // })
    // const certificateId = generateUniqueID(userId)
    // page.drawText(certificateId, {
    //   x: courseX + 240,
    //   y: courseY,
    //   size: 8,
    //   font: scustomFont,
    //   color: rgb(0.5, 0.5, 0.5),
    // })
    // const pdfBytes = await pdfDoc.save()

    // const res = new Response(pdfBytes, {
    //   headers: {
    //     "Content-Type": "application/pdf",
    //     "Content-Disposition": 'attachment; filename="example.pdf"',
    //   },
    // })

    // await db.certificate.create({
    //   data: {
    //     userId: userId,
    //     certificateId: certificateId,
    //     courseId: courseId,
    //   },
    // })
    // return res
  } catch (error: any) {
    // Handle the error and return it as a nextResponse
    return new NextResponse(error, { status: 500 })
  }
}

function generateUniqueID(userId: string) {
  const currentTime = Date.now()
  const uniqueID = `${userId.substring(
    userId.length - 5,
    userId.length
  )}${currentTime}`
  return uniqueID
}
