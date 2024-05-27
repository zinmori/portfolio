import { Html } from '@react-three/drei';

export default function Loader() {
  return (
    <Html>
      <div className="flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-20 w-20 border-2 border-
       border-blue-400 border-t-white"
        ></div>
      </div>
    </Html>
  );
}
