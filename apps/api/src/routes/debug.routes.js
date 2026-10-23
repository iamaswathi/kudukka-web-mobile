

// app.get('/block', (req, res) => {
//     const start = Date.now();
//     while (Date.now() - start < 5000) {
//         // Block for 5 seconds
//     }
//     res.json({ message: 'Blocked for 5 seconds' });
// });

// app.get('/slow', async(req, res) => {
//     await new Promise(resolve => setTimeout(resolve, 5000));
//     res.json({ message: 'waited 5 seconds' });
// });