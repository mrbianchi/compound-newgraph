import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { ProposalStatuses } from "../../src/constants";
import { Proposal } from "../../src/types/schema";

export abstract class ProposalDefaultValues {
  public static readonly Id: string = "1";
  public static readonly Status: string = ProposalStatuses.Active;
  public static readonly Proposer: string = "0x0000000000000000000000000000000000000001";
  public static readonly Targets: string[] = [
    "0x0000000000000000000000000000000000000002",
    "0x0000000000000000000000000000000000000003",
  ];
  public static readonly Values: u64[] = [12321, 4326];
  public static readonly Signatures: string[] = ["aSignature1", "aSignature2"];
  public static readonly CallDatas: string[] = ["0x1234", "0x4321"];
  public static readonly StartBlock: u64 = 1;
  public static readonly EndBlock: u64 = 1000;
  public static readonly Description: string = "aProposalDescription";
}

export class ProposalBuilder {
  private id: string = ProposalDefaultValues.Id;
  private status: string = ProposalDefaultValues.Status;
  private proposer: string = ProposalDefaultValues.Proposer;
  private targets: string[] = ProposalDefaultValues.Targets;
  private values: u64[] = ProposalDefaultValues.Values;
  private signatures: string[] = ProposalDefaultValues.Signatures;
  private callDatas: string[] = ProposalDefaultValues.CallDatas;
  private startBlock: u64 = ProposalDefaultValues.StartBlock;
  private endBlock: u64 = ProposalDefaultValues.EndBlock;
  private description: string = ProposalDefaultValues.Description;

  build(): Proposal {
    const entity = new Proposal(this.id);
    entity.status = this.status;
    entity.proposer = this.proposer;
    entity.targets = this.targets;
    entity.values = this.values.map<BigInt>((value) => BigInt.fromU64(value));
    entity.signatures = this.signatures;
    entity.calldatas = this.callDatas.map<Bytes>((callData) => Bytes.fromHexString(callData));
    entity.startBlock = BigInt.fromU64(this.startBlock);
    entity.endBlock = BigInt.fromU64(this.endBlock);
    entity.description = this.description;
    entity.save();
    return entity;
  }

  withId(id: string): ProposalBuilder {
    this.id = id;
    return this;
  }

  withStatus(status: string): ProposalBuilder {
    this.status = status;
    return this;
  }

  withProposer(proposer: string): ProposalBuilder {
    this.proposer = proposer;
    return this;
  }

  withTargets(targets: string[]): ProposalBuilder {
    this.targets = targets;
    return this;
  }

  withValues(values: u64[]): ProposalBuilder {
    this.values = values;
    return this;
  }

  withSignatures(signatures: string[]): ProposalBuilder {
    this.signatures = signatures;
    return this;
  }

  withCallDatas(callDatas: string[]): ProposalBuilder {
    this.callDatas = callDatas;
    return this;
  }

  withStartBlock(startBlock: u64): ProposalBuilder {
    this.startBlock = startBlock;
    return this;
  }

  withEndBlock(endBlock: u64): ProposalBuilder {
    this.endBlock = endBlock;
    return this;
  }

  withDescription(description: string): ProposalBuilder {
    this.description = description;
    return this;
  }
}
