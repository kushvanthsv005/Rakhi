export const config = {
  siteName:
    import.meta.env.VITE_SITE_NAME ||
    "Raksha Bandhan",

  enable3D:
    import.meta.env.VITE_ENABLE_3D !==
    "false",

  enableCursor:
    import.meta.env
      .VITE_ENABLE_CURSOR !==
    "false",

  enableParticles:
    import.meta.env
      .VITE_ENABLE_PARTICLES !==
    "false",
};