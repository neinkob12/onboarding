import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import berlinData from './berlin-bezirke.json'

const FILL = {
  default: '#F5F5F7',
  hover: '#E5E5EA',
  selected: 'rgba(0, 113, 227, 0.15)',
  highlighted: 'rgba(0, 113, 227, 0.08)',
}
const STROKE = { default: '#D1D1D6', selected: '#0071E3' }
const TRANSITION = 'fill 150ms ease, stroke 150ms ease'

export default function BerlinMap({ selected, onToggle, highlighted = [] }) {
  return (
    <ComposableMap
      width={680}
      height={500}
      projection="geoMercator"
      projectionConfig={{ center: [13.405, 52.52], scale: 45000 }}
      style={{ width: '100%', height: 'auto' }}
    >
      <Geographies geography={berlinData}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const name = geo.properties.name
            const isSelected = selected.includes(name)
            const isHighlighted = !isSelected && highlighted.includes(name)

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => onToggle(name)}
                style={{
                  default: {
                    fill: isSelected ? FILL.selected : isHighlighted ? FILL.highlighted : FILL.default,
                    stroke: isSelected ? STROKE.selected : STROKE.default,
                    strokeWidth: isSelected ? 2 : 1,
                    strokeDasharray: isHighlighted ? '4 2' : 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    transition: TRANSITION,
                  },
                  hover: {
                    fill: isSelected ? FILL.selected : FILL.hover,
                    stroke: isSelected ? STROKE.selected : STROKE.default,
                    strokeWidth: isSelected ? 2 : 1,
                    outline: 'none',
                    cursor: 'pointer',
                    transition: TRANSITION,
                  },
                  pressed: {
                    fill: isSelected ? FILL.selected : FILL.hover,
                    outline: 'none',
                  },
                }}
              />
            )
          })
        }
      </Geographies>
    </ComposableMap>
  )
}
