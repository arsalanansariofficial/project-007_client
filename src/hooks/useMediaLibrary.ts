'use client';

import { App_Response_Data_Public, App_Response_File } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function useMediaLibrary() {
  const [mediaLibrary, setMediaLibrary] = useState<
    App_Response_Data_Public<App_Response_File>[]
  >([]);

  useEffect(function () {}, []);
}
