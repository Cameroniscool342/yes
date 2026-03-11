import React from 'react';

export const EvoriLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img 
    src="https://i.ibb.co/ds75HQH7/image.png" 
    alt="Evori Logo" 
    className={`${className} object-contain mix-blend-screen`}
    referrerPolicy="no-referrer"
    onError={(e) => {
      (e.target as HTMLImageElement).src = "https://chatgpt.com/backend-api/estuary/content?id=file_000000001f94722f8607829c8480f681&ts=492549&p=fs&cid=1&sig=18fe280a76de7664137ba7383be662d430228d71dc017ea1741fbe4420d590fb&v=0";
    }}
  />
);
