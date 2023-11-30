import {useAppContext} from 'context/state'
import {SidePanelType} from '@/types/enums'
import JobsFilterSidePanel from '@/components/side-panels/JobsFilterSidePanel'
import SidePanel from '@/components/ui/SidePanel'
import JobReviewSidePanel from '@/components/side-panels/JobReviewSidePanel'
import JobInviteSidePanel from '@/components/side-panels/JobInviteSidePanel'

interface Props {
}

export default function SidePanelContainer(props: Props) {
  const appContext = useAppContext()
  return (
    <>
      {appContext.sidePanel === SidePanelType.JobsFilter &&
        <SidePanel>
          <JobsFilterSidePanel/>
        </SidePanel>}
      {appContext.sidePanel === SidePanelType.JobReview &&
        <SidePanel>
          <JobReviewSidePanel/>
        </SidePanel>}
      {appContext.sidePanel === SidePanelType.InviteToJob &&
        <SidePanel>
          <JobInviteSidePanel/>
        </SidePanel>}
    </>
  )
}
