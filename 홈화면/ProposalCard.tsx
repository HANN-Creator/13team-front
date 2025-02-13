"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button"; 

interface ProposalData {
  centerName: string;
  description: string;
  distance: string;
  conditions: {
    wage: string;
    days: string;
    time: string;
    matchRate: string;
  };
  requirements: {
    wage: string;
    days: string;
    time: string;
  };
}

export default function ProposalCard() {
  const [proposal, setProposal] = useState<ProposalData | null>(null);

  useEffect(() => {
    fetch("/api/proposal")
      .then((res) => res.json())
      .then((data) => setProposal(data))
      .catch((error) => console.error("API 호출 오류:", error));
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4">
      {proposal ? (
        <>
          <h2 className="text-lg font-bold">{proposal.centerName}</h2>
          <p className="text-gray-500">{proposal.description}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-blue-500">{proposal.distance}</p>
            <span className="text-gray-500 text-lg">➡</span>
          </div>

          <div className="mt-4 border-t pt-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">나의 희망조건</h3>
                <p>시급: <span className="font-bold">{proposal.conditions.wage}</span></p>
                <p>요일: <span className="font-bold">{proposal.conditions.days}</span></p>
                <p>시간: <span className="font-bold">{proposal.conditions.time}</span></p>
                <p>항목: <span className="font-bold">{proposal.conditions.matchRate}</span></p>
              </div>
              <div>
                <h3 className="font-semibold">요구 조건</h3>
                <p>시급: <span className="font-bold">{proposal.requirements.wage}</span></p>
                <p>요일: <span className="font-bold">{proposal.requirements.days}</span></p>
                <p>시간: <span className="font-bold">{proposal.requirements.time}</span></p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button label="수락" type="primary" />
            <Button label="조율 필요" type="secondary" />
            <Button label="거절" type="danger" />
          </div>
        </>
      ) : (
        <p className="text-gray-500 mt-2">로딩 중...</p>
      )}
    </div>
  );
}
