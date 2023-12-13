import {IProfile} from '@/data/interfaces/IProfile'
import {IProposal} from '@/data/interfaces/IProposal'
import {EventStatus} from '@/data/enum/EventStatus'
import {ICV} from '@/data/interfaces/ICV'
import {IVacancy} from '@/data/interfaces/IVacancy'

export interface ITimeSlot {
  start: string;
  end: string;
}

export interface IAvailableSlot {
  date: string
  start: string;
  end: string;
}

export default interface IEvent {
  id: number;
  cv: ICV;
  cvId: number;
  vacancy: IVacancy
  vacancyId: number
  proposal: IProposal;
  proposalId: number;
  author: IProfile;
  authorId: number;
  participants: IProfile[];
  participantsIds: string[];
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
