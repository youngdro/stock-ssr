export function ApiResult() {
  return (_t, _n, descripter) => {
    const original = descripter.value;
    descripter.value = async function (...args) {
      try {
        const data = await original.apply(this, args);
        return {
          success: true,
          data,
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
        };
      }
    };
  };
}
