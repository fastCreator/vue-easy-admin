export default require.context(process.env.cwdDir, false, /config.js$/)('./config.js').default
