export default function TestPage() {
  return (
    <div>
      <h1>CSS Debug Test Page</h1>

      {/* Test 1: Inline styles (should always work) */}
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        Test 1: If this has RED background - React is working
      </div>

      {/* Test 2: Basic Tailwind classes */}
      <div className="bg-blue-500 text-white p-5 mb-5 rounded">
        Test 2: If this has BLUE background - Tailwind is working
      </div>

      {/* Test 3: Multiple Tailwind classes */}
      <div className="flex gap-4 p-4 bg-gray-100 border-2 border-gray-300">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Green Button
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Red Button
        </button>
      </div>

      {/* Test 4: Gradient */}
      <div className="mt-5 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
        Test 4: Should be purple-pink gradient
      </div>

      {/* Test 5: Responsive */}
      <div className="mt-5 p-4 bg-yellow-200 md:bg-green-200 lg:bg-blue-200">
        Mobile: Yellow | Tablet: Green | Desktop: Blue
      </div>
    </div>
  );
}
