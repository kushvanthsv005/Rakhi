export function getDevicePerformance() {
  const memory =
    navigator.deviceMemory || 4;

  const cores =
    navigator.hardwareConcurrency || 4;

  const mobile =
    /Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    );

  if (
    mobile &&
    (memory <= 2 || cores <= 2)
  ) {
    return "low";
  }

  if (
    memory <= 4 ||
    cores <= 4
  ) {
    return "medium";
  }

  return "high";
}