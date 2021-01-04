import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component

  const blog = {
    likes: 0,
    title: 'Test',
    author: 'test',
    url: 'test.te.st',
    user: {
      username: 'opa',
      name: 'opa',
      id: '5ff1e7b61d8c69e3d0c2ef87',
    },
    __v: 0,
    id: '5ff2f8d73ddb71f01bf723fa',
  }
  const user = {
    name: 'opa',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9wYSIsImlkIjoiNWZmMWU3YjYxZDhjNjllM2QwYzJlZjg3IiwiaWF0IjoxNjA5NzQ4OTU3fQ.0itW7mIt2vHsp4b4aB5u_RZkksBS31jqDvP84UnQjf8',
    username: 'opa',
  }
  const mockLikeHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        updateBlog={mockLikeHandler}
        user={user}
        // deleteBlog={deleteBlog}
      />
    )
  })
  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.additional_parameters')

    expect(div).toHaveStyle('display: none;')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.additional_parameters')
    expect(div).not.toHaveStyle('display: none')
  })
  test('clicking the \'like\' button twice calls event handler twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
