import Levenshtein
from Bio import SeqIO
import time

start_time = time.time()

def calculate_similarity(sequence1, sequence2, name1, name2):
    return 1 - Levenshtein.distance(sequence1, sequence2) / max(len(sequence1), len(sequence2)), name1, name2

def main():
    fasta_file = "/Users/chenlab/Desktop/blastcodetesting/levinsteindistancetest.fasta"

    sequences = []
    sequence_names = []  # Store sequence names or identifiers

    for record in SeqIO.parse(fasta_file, "fasta"):
        sequences.append(str(record.seq))
        sequence_names.append(record.id)  # Store sequence names or identifiers

    num_sequences = len(sequences)

    output_file = "/Users/chenlab/Desktop/blastcodetesting/similarity_results.txt"

    with open(output_file, "w") as output_file:
        for i in range(num_sequences):
            sequence1 = sequences[i]
            name1 = sequence_names[i]
            print(i)
            for j in range(i + 1, num_sequences):
                sequence2 = sequences[j]
                name2 = sequence_names[j]

                similarity, seq_name1, seq_name2 = calculate_similarity(sequence1, sequence2, name1, name2)
                
                output_file.write(f"Similarity between {seq_name1} and {seq_name2}: {similarity:.4f}\n")

    print(f"Similarity results have been written to {output_file} ")

if __name__ == "__main__":
    main()

end_time = time.time()
elapsed_time = end_time - start_time
print(f"Total time taken: {elapsed_time:.2f} seconds")