import css from './style.css'
import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classNames from 'classnames'
import {createApi} from '/api'
import FilterField from './FilterField'
import List from './List'
import CreateList from './CreateList'
import TrashItem from './TrashItem'

const includes = (a, b) => {
  if (b === '')
    return true
  a = a.trim().toLowerCase()
  b = b.trim().toLowerCase()
  return a.includes(b)
}

const SideNav = ({lists, onSubmitFilter}) => {

  const content = useRef()
  const [filter, setFilter] = useState('')
  const resetFilter = () => setFilter('')

  const filteredLists = lists
    .filter(list => includes(list.title, filter))

  const listComponents = filteredLists
    .map(list => <List key={list.id} list={list} />)

  const text = filter.trim()

  /*
    Only show the "create*" button if (1) The filter text is non-empty
    and (2) The filter text does not EXACTLY match any existing list
    titles.
  */
  const shouldShowCreateText = text.length > 0 &&
    !filteredLists.some(list => list.title.trim() === text)

  const handleSubmit = (event) => {
    event.preventDefault()
    const text = filter.trim()
    if (text.length === 0 || !shouldShowCreateText)
      return
    const id = onSubmitFilter(text)
    resetFilter()
    requestAnimationFrame(() => {
      const list = content.current
        .querySelector(`.List[attr-id="${id}"]`)
      list.scrollIntoView({block: 'center'})
      list.classList.add(css.ItemJustCreated)
    })
  }

  return (
    <div className={classNames(css.SideNav, {
      [css.isFilterActive]: text.length > 0,
    })}>
      <FilterField
        value={filter}
        onChange={setFilter}
        onSubmit={handleSubmit} />
      <div ref={content} className={css.Content}>
        {shouldShowCreateText && <CreateList text={filter.trim()} onClick={handleSubmit} />}
        {listComponents}
        <TrashItem />
      </div>
    </div>
  )

}

SideNav.propTypes = {
  lists: PropTypes.array.isRequired,
  onSubmitFilter: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  lists: state.workspace.lists
    .map(id => state.lists[id])
    .filter(list => list.isAlive)
})

const mapDispatchToProps = (dispatch) => {
  const api = createApi(dispatch)
  return {
    onSubmitFilter (text) {
      const id = api.lists.create({title: text})
      api.workspace.setActiveList(id)
      return id
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)
