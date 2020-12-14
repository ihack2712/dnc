// Imports
import { parse } from "https://deno.land/std@0.80.0/flags/mod.ts";
import { encode, decode } from "https://deno.land/x/base@2.0.4/mod.ts";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const _ = parse(Deno.args);

const helpText = `Usage: dnc [...options] <number> [base=10]
    -h, --help
    -f, --from <base>`;

if (_.h || _.help) {
	console.log(helpText);
	Deno.exit(0);
}

let num: bigint;

if (_.f || _.from) {
	num = decode(_._[0] as string, alphabet.substring(0, Number(_.f || _.from)));
} else {
	num = BigInt(_._[0]);
}

let out: string;

if (_._[1] as string) {
	out = alphabet.substring(0, Number(_._[1]));
} else {
	out = alphabet.substring(0, 10);
}

console.log(encode(num, out));
