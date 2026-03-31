import { readFileSync, writeFileSync } from 'fs'

const filePath = '/vercel/share/v0-project/app/page.tsx'
let content = readFileSync(filePath, 'utf8')

// Replace dish image column
content = content.replace(
  `{/* Dish image — cols 1–2, row 1 */}
          <div style={{ gridColumn: '1 / 3', gridRow: '1', alignSelf: 'center' }}>`,
  `{/* Dish image — one col from left */}
          <div style={{ gridColumn: '2 / 4', gridRow: '1', alignSelf: 'start' }}>`
)

// Replace chef image column
content = content.replace(
  `{/* Chef image — cols 6–10, row 1 */}
          <div style={{ gridColumn: '6 / 11', gridRow: '1', alignSelf: 'start' }}>`,
  `{/* Chef image — two cols from right, 100px from body paragraph above */}
          <div style={{ gridColumn: '9 / 12', gridRow: '1 / 4', alignSelf: 'start', marginTop: '100px' }}>`
)

writeFileSync(filePath, content, 'utf8')
console.log('Patched successfully')
