import React from 'react'
import styled from 'styled-components'
import { useFormState } from 'react-use-form-state'
import { Select, TextInput } from '../form'
import { useGroups, useProjects } from '../../hooks'

const Wrapper = styled.div(({ theme }) => `
    padding: ${ theme.spacing.large } 0;
    display: flex;
    flex-direction: column;
    & > * { flex: 1; }
    & > *:first-child { margin: 0 0 ${ theme.spacing.medium } 0; }
    & > *:last-child { margin: ${ theme.spacing.medium } 0 0 0; }
    @media (min-width: 768px) {
        flex-direction: row;
        & > *:first-child { margin: 0 ${ theme.spacing.medium } 0 0; }
        & > *:last-child { margin: 0 0 0 ${ theme.spacing.medium }; }
    }
`)

const magnifyingGlassSvg = `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
`

const SearchInput = styled(TextInput)`
    background: url('${ magnifyingGlassSvg }') 100% / 24px no-repeat transparent;
`

export const NewsFilterForm = ({ groupId, projectId, changeGroupHandler, changeProjectHandler }) => {
    const groups = useGroups()
    const projects = useProjects()
    const [, { text, select }] = useFormState()
    const groupOptions = groups.map(group => ({ value: group.id, label: group.name }))
    const projectOptions = projects.map(project => ({ value: project.id, label: project.name }))

    return (
        <Wrapper>
            <Select
                { ...select('group') }
                options={ [{ value: '', label: 'Select Group' }].concat(groupOptions) }
                onChange={ changeGroupHandler }
                value={ groupId }
            />
            <Select
                { ...select('project') }
                options={ [{ value: '', label: 'Select Project' }].concat(projectOptions) }
                onChange={ changeProjectHandler }
                value={ projectId }
            />
            <SearchInput { ...text('query') } placeholder="Search News" />
        </Wrapper>
    )
}
