import React, { useState } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import S from './MyExperienceManagementCard.module.scss';
import Dropdown from '../../components/@shared/dropdown/Dropdown';
import useDropdown from '../../../hooks/useDropdown';
import AlertModal from '../../components/@shared/modal/AlertModal';
import { deleteMyActivity } from '../../../fetches/myActivities';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Experience {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

interface MyExperienceManagementCardProps {
  experience: Experience;
}

function MyExperienceManagementCard({ experience }: MyExperienceManagementCardProps) {
  const actionList = ['수정하기', '삭제하기'];
  const { toggleDropdown, isDropdownToggle } = useDropdown(actionList);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  function handleActionSelect(action: string) {
    toggleDropdown();
    if (action === '수정하기') {
      router.push(`/editactivities/${experience.id}`);
    } else if (action === '삭제하기') {
      setIsAlertOpen(true);
    }
  }

  function handleCloseAlert() {
    setIsAlertOpen(false);
  }

  async function handleConfirmDelete() {
    try {
      await deleteMyActivity(experience.id);
      setIsAlertOpen(false);
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  }

  return (
    <div className={S.card}>
      <Image
        src={experience.bannerImageUrl}
        alt={experience.title}
        className={S.image}
        width={204}
        height={204}
        style={{ objectFit: 'cover' }}
      />
      <div className={S.info}>
        <div className={S.rating}>
          ⭐ {experience.rating} ({experience.reviewCount})
        </div>
        <Link href={`/activities/${experience.id}`} className={S.title}>
          {experience.title}
        </Link>
        <div className={S.price}>₩{experience.price.toLocaleString()}</div>
      </div>
      <div className={S.actions}>
        <Dropdown
          data={actionList}
          onChange={handleActionSelect}
          isDropdownToggle={isDropdownToggle}
          toggleDropdown={toggleDropdown}
          type="kebab"
        />
      </div>
      <AlertModal
        isOpen={isAlertOpen}
        onClose={handleCloseAlert}
        onAlert={handleConfirmDelete}
        message="정말로 삭제하시겠습니까?"
        alertButtonText="삭제"
      />
    </div>
  );
}

export default MyExperienceManagementCard;
