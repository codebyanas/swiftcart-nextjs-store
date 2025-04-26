'use client'

import * as React from 'react';
import {
    Card, Box, Typography, useMediaQuery,
} from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import posts from '@/data/bigdiscountposts';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Grid from '@mui/material/Grid';

// 🔹 Mobile Layout
const MobileCard = ({ post }) => (
    <Card sx={{ width: 160, height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Image
            src={post.image}
            alt={post.title}
            width={0}  // This will be overridden by the parent container
            height={100}
            style={{
                width: '100%',
                objectFit: 'cover',
                backgroundColor: '#f5f5f5',
            }}
            sizes="100vw"
        />


        <Box sx={{ px: 1, pt: 1, pb: 1 }}>
            <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: 'rgb(75, 86, 107)',
                    fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {post.title}
            </Typography>
            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: '12px',
                    fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    margin: '0px',
                    color: 'rgb(210, 63, 87)'
                }}
            >
                ${post.price}
            </Typography>
        </Box>
    </Card>
);

// 🔹 Desktop Layout
const DesktopCard = ({ post }) => (
    <Card sx={{
        width: 215,
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }}>

        <Image
            src={post.image}
            alt={post.title}
            width={0} // This will be overridden by the parent container
            height={180}
            sizes="100vw"
            style={{
                width: 'calc(100% - 30px)', // Subtract 40px for horizontal margins (20px on each side)
                margin: '0 auto',          // Center the image horizontally
                objectFit: 'cover',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
            }}
        />

        <Box sx={{ px: 2, pt: 3 }}>
            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: 'rgb(75, 86, 107)',
                    fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginBottom: '4px'
                }}
            >
                {post.title}
            </Typography>
            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: '14px',
                    fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginTop: '4px',
                    margin: '0px',
                    color: 'rgb(210, 63, 87)'
                }}
            >
                ${post.price}
            </Typography>
        </Box>
    </Card >
);

export default function BigDiscount() {
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    ml: isMobile ? 0 : 0,
                }}
            >
                <FlashOnIcon sx={{ color: '#f44336', fontSize: isMobile ? 24 : 26, ml: 1 }} />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 500,
                        fontSize: isMobile ? '25px' : '25px',
                        lineHeight: 1.5,
                        color: '#2b3445',
                        fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                        textAlign: isMobile ? 'left' : 'left',
                        mx: isMobile ? 1 : 1,
                    }}
                >
                    Big Discounts
                </Typography>
            </Box>

            <Grid
                container justifyContent="center"
                spacing={1}
                sx={{
                    mx: isMobile ? 1 : 1, // Add margin-left and margin-right (16px mobile, 32px desktop)
                    mb: 6
                }}
            >
                {posts.map((post) => (
                    <Grid size= {{xs:6, sm:6, md:3}} key={post.id}
                        className="p-4 bg-white border rounded-lg shadow-md cursor-pointer"
                        onClick={() => router.push(`/product/${post.slug}`)}>
                        {isMobile ? (
                            <MobileCard post={post} onClick={() => handleCardClick(post.slug)} />
                        ) : (
                            <DesktopCard post={post} onClick={() => handleCardClick(post.slug)} />
                        )}
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

