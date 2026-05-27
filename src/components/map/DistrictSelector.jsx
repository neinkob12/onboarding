import { useState, useRef } from 'react'
import BerlinMap from './BerlinMap'
import Chip from '../ui/Chip'
import { useOnboarding } from '../../context/OnboardingContext'

const ALL_DISTRICTS = [
  'Mitte', 'Friedrichshain-Kreuzberg', 'Pankow', 'Charlottenburg-Wilmersdorf',
  'Spandau', 'Steglitz-Zehlendorf', 'Tempelhof-Schöneberg', 'Neukölln',
  'Treptow-Köpenick', 'Marzahn-Hellersdorf', 'Lichtenberg', 'Reinickendorf',
]

export default function DistrictSelector() {
  const { formData, updateField } = useOnboarding()
  const [query, setQuery] = useState('')
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const dragItem = useRef(null)

  const selected = formData.districts ?? []
  const highlighted = query.trim()
    ? ALL_DISTRICTS.filter((d) => d.toLowerCase().includes(query.trim().toLowerCase()))
    : []

  function toggle(name) {
    updateField(
      'districts',
      selected.includes(name) ? selected.filter((d) => d !== name) : [...selected, name]
    )
  }

  function handleSearchKeyDown(e) {
    if (e.key === 'Enter') {
      const toSelect = highlighted.find((d) => !selected.includes(d))
      if (toSelect) {
        updateField('districts', [...selected, toSelect])
        setQuery('')
      }
    }
  }

  function handleDragStart(index) {
    dragItem.current = index
  }

  function handleDragOver(e, index) {
    e.preventDefault()
    setDragOverIndex(index)
  }

  function handleDrop(index) {
    const from = dragItem.current
    if (from === null || from === index) return
    const next = [...selected]
    const [moved] = next.splice(from, 1)
    next.splice(index, 0, moved)
    updateField('districts', next)
    dragItem.current = null
    setDragOverIndex(null)
  }

  function handleDragEnd() {
    dragItem.current = null
    setDragOverIndex(null)
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        placeholder="Search districts..."
        className="w-full px-3.5 py-2.5 text-[15px] rounded-input border border-gray-200 bg-white text-text-primary placeholder:text-text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
      />

      <div className="rounded-card overflow-hidden shadow-card">
        <BerlinMap selected={selected} onToggle={toggle} highlighted={highlighted} />
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((district, index) => (
            <div
              key={district}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={[
                'cursor-grab active:cursor-grabbing transition-opacity duration-150',
                dragOverIndex === index && dragItem.current !== index ? 'opacity-50' : '',
              ].join(' ')}
            >
              <Chip label={district} mode="removable" onRemove={() => toggle(district)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
