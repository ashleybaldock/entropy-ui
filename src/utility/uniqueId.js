let lastId = 0;

export const uniqueId = () => lastId++ && `uniqueId_${lastId}`;
