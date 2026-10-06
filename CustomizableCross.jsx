import React from 'react';
import PhotoCross from './PhotoCross';

/**
 * Uses the ACTUAL product photo of the "GOD IS LOVE" key cross and recolors its
 * zones (Body, Letters, V-wedge, Bible Verse, IS) live.
 *
 * When `plain` is true, every zone is painted the same color (default grey),
 * so the whole cross becomes a uniform, lettering-free silhouette.
 */
export default function CustomizableCross({
  bodyColor = '#0055FF',
  emblemColor = '#39FF14',
  accentColor = '#39FF14',
  isColor = '#C0C0C0',
  verseColor,
  plain = false,
  plainColor = '#808080',
  className = '',
}) {
  if (plain) {
    return (
      <PhotoCross
        bodyColor={plainColor}
        accentColor={plainColor}
        verseColor={isColor && isColor.length ? isColor : plainColor}
        className={className}
      />
    );
  }
  return (
    <PhotoCross
      bodyColor={bodyColor}
      accentColor={accentColor}
      verseColor={verseColor || accentColor}
      className={className}
    />
  );
}