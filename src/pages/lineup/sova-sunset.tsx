import React, { useState } from "react";

type LineupCard = {
  id: string;
  site: "A" | "B";
  title: string;
  thumbnail: string; // cover image
  videoUrl: string; // video link
};

const sampleCards: LineupCard[] = [
  {
    id: "a1",
    site: "A",
    title: "Recon entry to A Site",
    thumbnail: "/assets/sova/A.jpg",
    videoUrl: "https://www.youtube.com/embed/exampleA1",
  },
  {
    id: "b1",
    site: "B",
    title: "B Site Shock Dart Post-Plant",
    thumbnail: "/assets/sunset/b_shock_thumb.jpg",
    videoUrl: "https://www.youtube.com/embed/exampleB1",
  },
  {
    id: "b1",
    site: "B",
    title: "B Site Shock Dart Post-Plant",
    thumbnail: "/assets/sunset/b_shock_thumb.jpg",
    videoUrl: "https://www.youtube.com/embed/exampleB1",
  },
];

export default function SovaSunsetLineups() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const renderSite = (site: "A" | "B") => (
    <section className="max-w-6xl mx-auto mb-12">
      <h2 className="text-2xl font-bold mb-4">Site {site}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleCards.filter((c) => c.site === site).map((card) => (
          <div
            key={card.id}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setSelectedVideo(card.videoUrl)}
          >
            <div className="h-40 overflow-hidden">
              <img src={card.thumbnail} alt={card.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <p className="font-medium text-lg text-white">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen  text-white p-8 bg-gradient-to-b from-[#141110] to-[#6E4A2A] font-chakra">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Sova — Sunset Lineups</h1>
        <p className="mt-2 text-sm text-slate-300">Select a site to view curated Sova lineups with video guides.</p>
      </header>

      <main className="max-w-6xl mx-auto">
        {renderSite("A")}
        {renderSite("B")}
      </main>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-4xl aspect-video bg-black">
            <iframe
              className="w-full h-full"
              src={selectedVideo}
              title="Lineup Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white rounded-full px-3 py-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
