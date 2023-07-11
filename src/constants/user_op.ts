import { ethers } from "ethers";
import { IUserOperation } from "types";

export const DEFAULT_USER_OP: IUserOperation = {
  sender: ethers.ZeroAddress,
  nonce: 0,
  initCode: ethers.hexlify("0x"),
  callData: ethers.hexlify("0x"),
  callGasLimit: 0n,
  verificationGasLimit: 0n,
  preVerificationGas: 0n,
  maxFeePerGas: 0n,
  maxPriorityFeePerGas: 0n,
  paymasterAndData: ethers.hexlify("0x"),
  signature: ethers.hexlify("0x"),
}