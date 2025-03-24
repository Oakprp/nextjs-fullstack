import React from 'react'
import { 
  Container, Card, CardContent, CardMedia, Typography 
} from '@mui/material';

async function getData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/attractions/${id}/`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Page({ params }) {
  const id = params.id
  const data = await getData(id)

  if (!data || !data.name || !data.coverimage || !data.detail) {
    return <div>ข้อมูลไม่ถูกต้อง</div>
  }

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{ height: 400 }}
          image={data.coverimage}
          title={data.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.detail}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
