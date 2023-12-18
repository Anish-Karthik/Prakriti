import * as React from "react"
import { CardActionArea } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"

interface ActionAreaCardProps {
  src: string
  data: string
  season: string
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({
  src,
  data,
  season,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="130" image={src} />
      </CardActionArea>
      <CardContent>
        <h2 className="text-center text-xl font-semibold py-2">{season}</h2>
        <div className="text-sm" dangerouslySetInnerHTML={{ __html: data }} />
      </CardContent>
    </Card>
  )
}

export default ActionAreaCard
