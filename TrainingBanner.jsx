import React from 'react';

const VIDEO = '/media/video-training-banner.MOV';
const POSTER = '/media/services-2-and-training-banner.png';

export default function TrainingBanner() {
  return (
    <div className="relative w-full">
      <div className="relative h-[460px] sm:h-[520px] lg:h-[560px] w-full overflow-hidden">
        <video
          src={VIDEO}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(1.18) saturate(1.25) contrast(1.02)' }}
        />
      </div>
    </div>
  );
}