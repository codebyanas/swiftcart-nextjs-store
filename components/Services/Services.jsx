'use client'

import * as React from 'react';
import {
    Card, Box, Typography, Grid, useMediaQuery,
} from '@mui/material';
import posts from '@/data/servicesposts';
import { useRouter } from 'next/navigation';

// 🔹 Mobile Layout
const MobileCard = ({ post }) => (
    <Card
        sx={{
            width: 326,
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80px',
                width: '80px',
                backgroundColor: '#f5f5f5',
                borderRadius: '10%',
                marginTop: '40px',
                color: 'rgb(125, 135, 156)',
            }}
        >
            {post.icon}
        </Box>

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                pt: 2,
                textAlign: 'center',
                flexGrow: 1, // Ensures the box grows to occupy available space
            }}
        >
            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: 'rgb(67, 77, 95)',
                    fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                    lineHeight: 1.5,
                    marginBottom: '8px',
                }}
            >
                {post.title}
            </Typography>

            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: 'rgb(125, 135, 156)',
                    fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                    lineHeight: 1.5,
                }}
            >
                We offer competitive prices on our 100 million plus product range. Shop with confidence.
            </Typography>
        </Box>
    </Card>
);

// 🔹 Desktop Layout
const DesktopCard = ({ post }) => (
    <Card
        sx={{
            width: 326,
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80px',
                width: '80px',
                backgroundColor: '#f5f5f5',
                borderRadius: '10%',
                marginTop: '40px',
                color: 'rgb(125, 135, 156)',
            }}
        >
            {post.icon}
        </Box>

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                pt: 2,
                textAlign: 'center',
                flexGrow: 1, // Ensures the box grows to occupy available space
            }}
        >
            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: 'rgb(67, 77, 95)',
                    fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                    lineHeight: 1.5,
                    marginBottom: '8px',
                }}
            >
                {post.title}
            </Typography>

            <Typography
                sx={{
                    fontWeight: 500,
                    fontSize: '14px',
                    color: 'rgb(125, 135, 156)',
                    fontFamily: '"Public Sans", "Public Sans Fallback", sans-serif',
                    lineHeight: 1.5,
                }}
            >
                We offer competitive prices on our 100 million plus product range. Shop with confidence.
            </Typography>
        </Box>
    </Card>
);

export default function Services() {
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
                    <Grid item xs={6} sm={6} md={3} key={post.id}
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

