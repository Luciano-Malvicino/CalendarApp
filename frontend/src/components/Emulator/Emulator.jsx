import React from 'react';

function Emulator({ emulatorFile }) {
  console.log('Emulator received emulatorFile:', emulatorFile);

  const iframeSrcDoc = `
    <html>
        <script>
            EJS_player = "#game";
            EJS_core = "gba";
            EJS_gameName = "Pokemon Emerald";
            EJS_color = "#0064ff";
            EJS_pathtodata = "https://cdn.jsdelivr.net/gh/EmulatorJS/EmulatorJS@latest/data/";
            EJS_gameUrl = "Pokemon_Emerald.gba";
            EJS_biosUrl = "gba_bios.bin";
        </script>
        <!-- ... other content ... -->
    </html>
  `;

  return (
    <div>
      <iframe
        srcDoc={iframeSrcDoc}
        title="Emulator"
        width="640"
        height="480"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}

export default Emulator;

