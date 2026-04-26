export function exportToCsv(filename: string, data: any[]) {
  if (!data || !data.length) {
    alert('No data to export')
    return
  }

  // Get headers from first object
  const headers = Object.keys(data[0])
  
  // Convert objects to CSV lines
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        let value = row[header]
        // Escape quotes and handle strings with commas
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""')
          if (value.includes(',') || value.includes('\n') || value.includes('"')) {
            value = `"${value}"`
          }
        }
        return value
      }).join(',')
    )
  ].join('\n')

  // Create Blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
