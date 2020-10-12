import css from './style.css'
import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {createApi} from '/api'
import Switch from './Switch'
import Button from './Button'
import NoteInput from './NoteInput'

const Note = ({
  note, isLastCreated,
  onChange, onToggle, onRemove, onNoteEvent,
}) => {

  const ref = useRef()

  // useEffect(() => {
  //   if (isLastCreated && note.createdBy === 'NOTE_ITEM' && !note.wasCreatedAtStartPos)
  //     ref.current.querySelector('input').focus()
  // }, [])

  // function withPrevInput (fn, alt) {
  //   const prev = ref.current.previousSibling
  //   if (prev)
  //     fn(prev.querySelector('input'), prev)
  //   else
  //     if (alt) alt()
  // }

  // function withNextInput (fn) {
  //   const next = ref.current.nextSibling
  //   if (next)
  //     fn(next.querySelector('input'), next)
  // }


  // handleKeyDown (event) {
  //   const {ref} = this
  //   const input = ref.current.querySelector('input')
  //   const pos = input.selectionDirection === 'forward'
  //     ? input.selectionEnd
  //     : input.selectionStart
  //   onKeyDown(event, note.id, pos)
  //   if (event.keyCode === 13 /* ENTER */) {
  //     if (pos === input.value.length) onEnterAtEnd(note.id)
  //     else if (pos === 0) onEnterAtStart(note.id)
  //     else onEnterAtPos(note.id, note.text, pos)
  //   } else if (event.keyCode === 8 /* BACKSPACE */) {
  //     if (note.text === '') {
  //       withPrevInput(prev => {
  //         event.preventDefault()
  //         prev.focus()
  //       }, () => {
  //         document.getElementById('InputField').focus()
  //       })
  //       onRemove(note.id)
  //     } else if (pos === 0) {
  //       withPrevInput(prev => {
  //         event.preventDefault()
  //         prev.focus()
  //         // ::TODO:: Focus at last character
  //         onMergeWithPrev(note.id, note.text)
  //       })
  //     }
  //   } else if (event.keyCode === 37 /* LEFT */ && pos === 0) {
  //     withPrevInput((prev) => {
  //       event.preventDefault()
  //       prev.focus()
  //       prev.setSelectionRange(prev.value.length, prev.value.length)
  //     })
  //   } else if (event.keyCode === 39 /* RIGHT */ && pos === input.value.length) {
  //     withNextInput((next) => {
  //       event.preventDefault()
  //       next.focus()
  //       next.setSelectionRange(0, 0)
  //     })
  //   }
  // }

  const handleNoteEvent = (event) => onNoteEvent(note.id, ref.current, event)

  return (
    <div ref={ref} className={'Note ' + css.Note}>
      <Switch
        isOn={note.isDone}
        onClick={() => onToggle(note.id, !note.isDone)} />
      <div style={{width: '100%'}}>
        <NoteInput
          className={classNames(css.Input, {[css.isDone]: note.isDone})}
          value={note.text}
          onChange={event => onChange(note.id, event.target.value)}
          onNoteEvent={handleNoteEvent} />
      </div>
      <Button className={css.RemoveButton} onClick={() => onRemove(note.id)}>
        🗑
      </Button>
    </div>
  )

}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  isLastCreated: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onNoteEvent: PropTypes.func.isRequired,
}

const mapStateToProps = (state, {note}) => ({
  isLastCreated: note.id === state.notesMeta.lastCreated,
})

// ::TODO:: Remove obsolete handlers.
const mapDispatchToProps = (dispatch) => {
  const api = createApi(dispatch)
  return {
    onToggle (id, isDone) {
      api.notes.toggle(id, isDone)
    },
    onChange (id, text) {
      api.notes.update(id, {text})
    },
    onRemove (id) {
      api.notes.remove(id)
    },
    onMergeWithPrev (id, text) {
      console.log('MERGE')
      api.notes.merge(id)
    },
    onEnterAtStart (id) {
      api.notes.create({
        text: '',
        insertBefore: id,
        createdBy: 'NOTE_ITEM',
        wasCreatedAtStartPos: true,
      })
    },
    onEnterAtPos (id, text, pos) {
      api.notes.update(id, {text: text.slice(0, pos)})
      api.notes.create({
        text: text.slice(pos),
        insertAfter: id,
        createdBy: 'NOTE_ITEM',
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)
