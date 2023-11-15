import {IProfile} from '@/data/interfaces/IProfile'
import {IProposal} from '@/data/interfaces/IProposal'
import {EventStatus} from '@/data/enum/EventStatus'

export interface ITimeSlot {
  start?: string;
  end?: string;
}

export default interface IEvent {
  id: number;
  proposal: IProposal;
  proposalId: number;
  author: IProfile;
  authorId: number;
  participants: IProfile[];
  participantsIds: number[];
  theme: string;
  description: string;
  status: EventStatus;
  start?: Date;
  end?: Date;
  timezone: string;
  place: string;
  duration: number;
  slots: ITimeSlot[];
  owner?: IProfile;
  ownerId?: number;
  createdAt: Date;
  updatedAt: Date;

}
