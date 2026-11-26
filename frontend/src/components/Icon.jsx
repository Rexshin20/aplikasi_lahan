import feather from 'feather-icons'

/** Ikon Feather — sama seperti `data-feather="..."` di template HTML lama. */
export default function Icon({ name, size = 18, className = '', strokeWidth = 2 }) {
  const icon = feather.icons[name]
  if (!icon) return null

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: icon.toSvg({
          width: size,
          height: size,
          'stroke-width': strokeWidth,
        }),
      }}
    />
  )
}
