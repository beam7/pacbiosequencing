import Levenshtein
from Bio import SeqIO
from multiprocessing import Pool, cpu_count
import time

start_time = time.time()

def calculate_similarity(pair):
    sequence1, sequence2, name1, name2 = pair
    distance = Levenshtein.distance(sequence1, sequence2)
    max_length = max(len(sequence1), len(sequence2))
    return 1 - distance / max_length, name1, name2

def main():
    fasta_file = "/Users/chenlab/Desktop/blastcodetesting/levinsteindistancetest.fasta"

    sequences = [str(record.seq) for record in SeqIO.parse(fasta_file, "fasta")]
    sequence_names = [record.id for record in SeqIO.parse(fasta_file, "fasta")]

    num_sequences = len(sequences)

    tasks = []

    for i in range(num_sequences):
        for j in range(i + 1, num_sequences):
            tasks.append((sequences[i], sequences[j], sequence_names[i], sequence_names[j]))

    with Pool(processes=cpu_count()) as pool:
        results = pool.map(calculate_similarity, tasks)

    with open("/Users/chenlab/Desktop/blastcodetesting/similarity_results.txt", "w") as output_file:
        for similarity, seq_name1, seq_name2 in results:
            output_file.write(f"Similarity between {seq_name1} and {seq_name2}: {similarity:.4f}\n")

    print("Similarity results have been written to 'similarity_results.txt'")

if __name__ == "__main__":
    main()



end_time = time.time()
elapsed_time = end_time - start_time
print(f"Total time taken: {elapsed_time:.2f} seconds")