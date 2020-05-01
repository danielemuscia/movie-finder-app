import React from 'react'
import SearchList from '../components/SearchList'

export default function SearchResults(props) {
    return (
            <SearchList history={props.history} />
    )
}
