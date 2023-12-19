

import User from "@/lib/models/user.model"
import db from "@/lib/prismadb"

export async function POST(req: Request) {
  const{userId,prakriti}=await req.json();
  
  console.log(userId)
  const f=await db.user.update({
    where:{
      id:userId!,
    },
    data:{
      prakriti:prakriti,
    }
  })

  console.log("Success")

}
