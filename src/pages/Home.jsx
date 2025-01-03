import React from 'react';

export default function Home() {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Real Estate App</h1>
            <p className="text-lg">Buy and sell properties with ease.</p>
            <img src="https://images.unsplash.com/photo-1643906651695-4c93cb0dea7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw5fHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDB8fHx8MTczNTkzNTMyNXww&ixlib=rb-4.0.3&q=80&w=1080"
                
                alt="Real Estate"
                className="mt-6 w-full max-w-2xl h-64 object-cover"
                data-image-request="modern apartment building exterior"
            />
        </div>
    );
}