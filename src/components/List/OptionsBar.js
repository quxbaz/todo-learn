import css from './style.css'
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {createApi} from '/api'
import {createToast} from '/toasts'

const Option = ({children, className, title, onClick}) => (
  <a
    className={classNames(css.Option, className)}
    title={title}
    onClick={onClick}>
    <span className={css.OptionText}>
      {children}
    </span>
  </a>
)

Option.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

const OptionsBar = ({anyNotesChecked, onClear, onDelete}) => {

  const handleClearShortcut = (event) => {
    if (event.altKey && event.key === 'c') {
      event.preventDefault()
      if (anyNotesChecked)
        onClear()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleClearShortcut)
    return () => window.removeEventListener('keydown', handleClearShortcut)
  })

  const handleClickRename = () => {
    console.log('rename')
  }

  const className = classNames(css.OptionsBar, {
    [css.anyNotesChecked]: anyNotesChecked,
  })

  return (
    <div className={className}>
      <Option
        className={css.Clear}
        title='Alt-c'
        onClick={onClear}>Clear checked notes</Option>
      <Option onClick={handleClickRename}>Rename</Option>
      <Option onClick={onDelete}>Delete</Option>
    </div>
  )

}

OptionsBar.propTypes = {
  list: PropTypes.object.isRequired,
  anyNotesChecked: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

const mapStateToProps = (state, {list}) => ({
  anyNotesChecked: list.notes
    .map(id => state.notes[id])
    .some(note => note.isDone)
})

const mapDispatchToProps = (dispatch, {list}) => {
  const api = createApi(dispatch)
  return {
    onClear () {
      api.lists.clearNotes(list.id)
    },
    onDelete (id) {
      api.lists.discard(list.id)
      createToast('toast-zone', {
        text: `"${list.title}" moved to trash.`,
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsBar)
