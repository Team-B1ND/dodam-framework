"use client";

import { TableProps } from "../../types/props";
import * as S from "./style"

export const Table = ({ keys, data, onRowClick }: TableProps) => {
  const handleRowClick = (idx: number) => {
    if (onRowClick) onRowClick(idx);
  };

  if (!data || data.length === 0) {
    return <S.BlankContainer>데이터가 존재하지 않습니다!</S.BlankContainer>;
  }

  return (
    <S.Wrapper>
      <S.Table>
        <thead>
          <S.Tr>
            {keys.map(([label, width]) => (
              <S.Th $width={width} key={label + width}>
                {label}
              </S.Th>
            ))}
          </S.Tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <S.Tr
              key={rIdx}
              $clickable={!!onRowClick}
              onClick={() => handleRowClick(rIdx)}
            >
              {row.map((cell, cIdx) => (
                <S.Td $width={keys[cIdx]?.[1] ?? "AUTO"} key={cIdx}>
                  {cell}
                </S.Td>
              ))}
            </S.Tr>
          ))}
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};

export default Table;
