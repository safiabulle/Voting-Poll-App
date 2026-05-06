import { useState } from 'react'

/**
 * PollForm
 * Controlled form that lets users add a new poll option.
 * The actual data mutation happens in App.jsx via the onAddOption prop.
 *
 * Props:
 *  - onAddOption {Function} Called with the new option label string.
 *                           Returns true on success, false if duplicate.
 *  - options     {Array}    Existing options (used for duplicate check feedback)
 */
function PollForm({ onAddOption, options }) {
  const [inputValue, setInputValue] = useState('')
  const [error, setError]           = useState('')
  const [success, setSuccess]       = useState(false)
  const [isSaving, setIsSaving]     = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const trimmed = inputValue.trim()

    if (!trimmed) {
      setError('Please enter an option name.')
      return
    }

    if (trimmed.length < 2) {
      setError('Option must be at least 2 characters.')
      return
    }

    if (trimmed.length > 40) {
      setError('Option must be 40 characters or fewer.')
      return
    }

    // Check for duplicates (case-insensitive)
    const isDuplicate = options.some(
      (o) => o.label.toLowerCase() === trimmed.toLowerCase()
    )
    if (isDuplicate) {
      setError(`"${trimmed}" already exists as an option.`)
      return
    }

    try {
      setIsSaving(true)
      const added = await onAddOption(trimmed)

      if (added !== false) {
        setInputValue('')
        setSuccess(true)
        setTimeout(() => setSuccess(false), 2500)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Text input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                if (error) setError('')
              }}
              placeholder="e.g. SolidJS, Alpine.js…"
              maxLength={40}
              className="w-full rounded-xl px-4 py-3 text-sm sm:text-base outline-none transition-all duration-200"
              style={{
                background: '#fff',
                border: error
                  ? '1.5px solid var(--coral)'
                  : '1.5px solid var(--border)',
                color: 'var(--ink)',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onFocus={(e) => {
                if (!error)
                  e.target.style.border = '1.5px solid var(--teal)'
              }}
              onBlur={(e) => {
                if (!error)
                  e.target.style.border = '1.5px solid var(--border)'
              }}
              aria-label="New poll option"
              aria-describedby={error ? 'form-error' : undefined}
            />

            {/* Character counter */}
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
              style={{ color: inputValue.length > 35 ? 'var(--coral)' : '#c0bdb4' }}
            >
              {inputValue.length}/40
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer hover:opacity-90 active:scale-95"
            style={{
              background: 'var(--coral)',
              color: '#ffffff',
              whiteSpace: 'nowrap',
              opacity: isSaving ? 0.65 : 1,
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {isSaving ? 'Adding...' : 'Add Option'}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p
            id="form-error"
            className="mt-2 text-sm flex items-center gap-1.5 fade-in-up"
            style={{ color: 'var(--coral)' }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </p>
        )}

        {/* Success message */}
        {success && (
          <p
            className="mt-2 text-sm flex items-center gap-1.5 fade-in-up"
            style={{ color: 'var(--teal)' }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Option added successfully!
          </p>
        )}
      </form>

      {/* Current option count hint */}
      <p className="mt-3 text-xs" style={{ color: '#b0ada6' }}>
        {options.length} {options.length === 1 ? 'option' : 'options'} in the poll
      </p>
    </div>
  )
}

export default PollForm
