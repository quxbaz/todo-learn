import css from './style.css'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createApi} from '/api'
import {createToast} from '/toasts'
import {getSortedLists} from '/state/lists/selectors'
import EmptyView from './EmptyView'
import EmptyButton from './EmptyButton'
import Entry from './Entry'

const TrashView = ({lists, onRestore, onDelete}) => {
  return lists.length === 0 ? (
    <EmptyView />
  ) : (
    <div className={css.TrashView}>
      <header className={css.Header}>
        <EmptyButton />
      </header>
      <div className={css.TrashContent}>
        {lists.map((list, i) => (
          <Entry key={list.id} i={i} list={list}
            onRestore={onRestore} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

TrashView.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRestore: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  lists: getSortedLists(state, list => !list.isAlive),
})

const mapDispatchToProps = (dispatch) => {
  const api = createApi(dispatch)
  return {
    onRestore (list) {
      api.lists.update(list.id, {isAlive: true})
      createToast('toast-zone', {
        text: `Restored "${list.title}"`,
      })
    },
    onDelete (id) {
      api.lists.destroy(id)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashView)
