import React from 'react'

export default function Repo(props) {
  const { owner, repo } = props.match.params
  return (
    <div>
      Owner:{owner} Repo:{repo}
    </div>
  )
}
