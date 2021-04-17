// import { useState, useEffect } from 'react';

const fetchSession = async () => {
  const data = await fetch('/api/auth/session').then(res => res.json());

  return {
    success: Boolean(data),
    user: data,
  };
};
