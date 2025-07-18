import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LaunchCard from '@/components/LaunchCard'
import { Launch } from '@/types/spacex'

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

const mockLaunch: Launch = {
  id: '1',
  mission_name: 'FalconSat',
  launch_date_utc: '2006-03-24T22:30:00.000Z',
  launch_success: true,
  details: 'Engine failure at 33 seconds and loss of vehicle',
  rocket: {
    rocket_name: 'Falcon 1',
  },
  launch_site: {
    site_name_long: 'Kwajalein Atoll Omelek Island',
  },
  links: {
    mission_patch: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
    mission_patch_small: 'https://images2.imgbox.com/4f/e3/I0lkuJ2e_o.png',
    video_link: 'https://www.youtube.com/watch?v=0a_00nJ_Y88',
    article_link: 'https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html',
  },
}

const mockFailedLaunch: Launch = {
  ...mockLaunch,
  id: '2',
  mission_name: 'DemoSat',
  launch_success: false,
}

const mockUpcomingLaunch: Launch = {
  ...mockLaunch,
  id: '3',
  mission_name: 'Starship IFT-1',
  launch_success: null,
}

describe('LaunchCard', () => {
  it('renders mission name and basic information', () => {
    render(<LaunchCard launch={mockLaunch} />)
    
    expect(screen.getByText('FalconSat')).toBeInTheDocument()
    expect(screen.getByText('Falcon 1')).toBeInTheDocument()
    expect(screen.getByText('Kwajalein Atoll Omelek Island')).toBeInTheDocument()
  })

  it('displays formatted launch date', () => {
    render(<LaunchCard launch={mockLaunch} />)
    
    expect(screen.getByText('Mar 24, 2006')).toBeInTheDocument()
  })

  it('shows success status for successful launches', () => {
    render(<LaunchCard launch={mockLaunch} />)
    
    const statusElement = screen.getByText('Success')
    expect(statusElement).toBeInTheDocument()
    expect(statusElement).toHaveClass('text-green-300')
  })

  it('shows failed status for failed launches', () => {
    render(<LaunchCard launch={mockFailedLaunch} />)
    
    const statusElement = screen.getByText('Failed')
    expect(statusElement).toBeInTheDocument()
    expect(statusElement).toHaveClass('text-red-300')
  })

  it('shows upcoming status for future launches', () => {
    render(<LaunchCard launch={mockUpcomingLaunch} />)
    
    const statusElement = screen.getByText('Upcoming')
    expect(statusElement).toBeInTheDocument()
    expect(statusElement).toHaveClass('text-yellow-300')
  })

  it('displays mission patch when available', () => {
    render(<LaunchCard launch={mockLaunch} />)
    
    const missionPatch = screen.getByAltText('FalconSat patch')
    expect(missionPatch).toBeInTheDocument()
    expect(missionPatch).toHaveAttribute('src', mockLaunch.links.mission_patch_small)
  })

  it('displays mission details when available', () => {
    render(<LaunchCard launch={mockLaunch} />)
    
    expect(screen.getByText('Engine failure at 33 seconds and loss of vehicle')).toBeInTheDocument()
  })

  it('renders View Details button with correct link', () => {
    render(<LaunchCard launch={mockLaunch} />)
    
    const viewDetailsButton = screen.getByText('View Details')
    expect(viewDetailsButton).toBeInTheDocument()
    
    const link = viewDetailsButton.closest('a')
    expect(link).toHaveAttribute('href', '/launches/1')
  })

  it('renders Watch button when video link is available', () => {
    render(<LaunchCard launch={mockLaunch} />)
    
    const watchButton = screen.getByText('Watch')
    expect(watchButton).toBeInTheDocument()
    
    const link = watchButton.closest('a')
    expect(link).toHaveAttribute('href', mockLaunch.links.video_link)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders Read button when article link is available', () => {
    render(<LaunchCard launch={mockLaunch} />)
    
    const readButton = screen.getByText('Read')
    expect(readButton).toBeInTheDocument()
    
    const link = readButton.closest('a')
    expect(link).toHaveAttribute('href', mockLaunch.links.article_link)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('does not render Watch button when video link is not available', () => {
    const launchWithoutVideo = {
      ...mockLaunch,
      links: {
        ...mockLaunch.links,
        video_link: null,
      },
    }
    
    render(<LaunchCard launch={launchWithoutVideo} />)
    
    expect(screen.queryByText('Watch')).not.toBeInTheDocument()
  })

  it('does not render Read button when article link is not available', () => {
    const launchWithoutArticle = {
      ...mockLaunch,
      links: {
        ...mockLaunch.links,
        article_link: null,
      },
    }
    
    render(<LaunchCard launch={launchWithoutArticle} />)
    
    expect(screen.queryByText('Read')).not.toBeInTheDocument()
  })

  it('handles unknown launch site gracefully', () => {
    const launchWithoutSite = {
      ...mockLaunch,
      launch_site: {
        site_name_long: null,
      },
    }
    
    render(<LaunchCard launch={launchWithoutSite} />)
    
    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })

  it('does not render details section when details are not available', () => {
    const launchWithoutDetails = {
      ...mockLaunch,
      details: null,
    }
    
    render(<LaunchCard launch={launchWithoutDetails} />)
    
    expect(screen.queryByText('Engine failure at 33 seconds and loss of vehicle')).not.toBeInTheDocument()
  })
})